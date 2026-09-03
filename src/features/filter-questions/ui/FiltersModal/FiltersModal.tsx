import styles from "./FiltersModal.module.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Section } from "@/shared/ui/Section";
import { Chip } from "@/shared/ui/Chip";
import { SearchInput } from "../SearchInput";

import { LEVELS, RATINGS, STATUSES } from "@/shared/constants/filters";
import { useGetSkillsQuery, useGetSpecializationsQuery } from "../../api/filterApi";

import type { ActiveState, SearchParamsLike, SpecializationItem, SkillsItem } from "./types";

export function FiltersModal() {
	const getInitialState = (params: SearchParamsLike): ActiveState => {
		const urlComplexityIds = params.get("complexity")?.split(",").map(Number) ?? [];

		const initialComplexityRages = LEVELS.filter((level) =>
			level.id.some((id) => urlComplexityIds.includes(id))
		).map((level) => level.name);

		return {
			status: params.get("status")?.split(",").filter(Boolean) ?? [],
			skills: params.get("skills")?.split(",").filter(Boolean) ?? [],
			specializationId: params.get("specializationId")?.split(",").filter(Boolean) ?? [],
			rate: params.get("rate")?.split(",").filter(Boolean) ?? [],
			complexity: initialComplexityRages,
			titleOrDescription: params.get("titleOrDescription") || "",
		};
	};

	const applyFiltersToUrl = (
		params: SearchParamsLike,
		state: ActiveState,
		setSearchParams: (params: URLSearchParams, options?: { replace?: boolean }) => void,
	) => {
		const newParams = new URLSearchParams(params.toString());
		let isChanged = false;

		const currentSkills = params.get("skills") || "";
		const nextSkills = state.skills.join(",");
		if (nextSkills !== currentSkills) {
			if (state.skills.length) newParams.set("skills", nextSkills);
			else newParams.delete("skills");
			isChanged = true;
		}

		const currentSpecializations = params.get("specializationId") || "";
		const nextSpecializations = state.specializationId.join(",");
		if (nextSpecializations !== currentSpecializations) {
			if (state.specializationId.length) newParams.set("specializationId", nextSpecializations);
			else newParams.delete("specializationId");
			isChanged = true;
		}

		const currentStatuses = params.get("status") || "";
		const nextStatuses = state.status.join(",");
		if (nextStatuses !== currentStatuses) {
			if (state.status.length) newParams.set("status", nextStatuses);
			else newParams.delete("status");
			isChanged = true;
		}

		const currentComplexity = params.get("complexity") || "";
		const complexityIds = state.complexity.flatMap(
			(name) => LEVELS.find((l) => l.name === name)?.id || []
		);
		const nextComplexity = complexityIds.join(",");
		if (nextComplexity !== currentComplexity) {
			if (state.complexity.length) newParams.set("complexity", nextComplexity);
			else newParams.delete("complexity");
			isChanged = true;
		}

		const currentRate = params.get("rate") || "";
		const nextRate = state.rate.join(",");
		if (nextRate !== currentRate) {
			if (state.rate.length) newParams.set("rate", nextRate);
			else newParams.delete("rate");
			isChanged = true;
		}

		const currentSearch = params.get("titleOrDescription") || "";
		const nextSearch = state.titleOrDescription;
		if (nextSearch !== currentSearch) {
			if (nextSearch) newParams.set("titleOrDescription", nextSearch);
			else newParams.delete("titleOrDescription");
			isChanged = true;
		}

		// Страницу сбрасываем ОДИН РАЗ в самом конце, если хоть один параметр поменялся
		if (isChanged) {
			newParams.set("page", "1");
			setSearchParams(newParams, { replace: true });
		}
	};

	const [searchParams, setSearchParams] = useSearchParams();
	const [active, setActive] = useState<ActiveState>(() => getInitialState(searchParams));
	const [statuses] = useState(STATUSES);
	const [isDesktop, setIsDesktop] = useState(false);

	// Храним актуальный стейт для безопасного размонтирования на мобильных
	const activeRef = useRef(active);
	useEffect(() => {
		activeRef.current = active;
	}, [active]);

	// 1. Отслеживаем брейкпоинт экрана
	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');
		setIsDesktop(mediaQuery.matches);
		const handleScreenChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
		mediaQuery.addEventListener('change', handleScreenChange);
		return () => mediaQuery.removeEventListener('change', handleScreenChange);
	}, []);

	// 2. ДЕСКТОП: Умная синхронизация чипсов (мгновенно) и инпута (дебаунс 400мс)
	useEffect(() => {
		if (!isDesktop) return;

		const currentUrlSearch = searchParams.get("titleOrDescription") || "";

		// Если изменился именно текст поиска — пускаем его через задержку (Debounce)
		if (active.titleOrDescription !== currentUrlSearch) {
			const delayDebounceFn = setTimeout(() => {
				applyFiltersToUrl(searchParams, active, setSearchParams);
			}, 400);

			return () => clearTimeout(delayDebounceFn);
		}

		// Если изменились чипсы — применяем их мгновенно
		applyFiltersToUrl(searchParams, active, setSearchParams);

	}, [active, isDesktop, searchParams, setSearchParams]);

	// 3. МОБИЛКА: Применяем все накопленные фильтры за один раз при закрытии шторки
	useEffect(() => {
		return () => {
			const isCurrentlyMobile = !window.matchMedia("(min-width: 1024px)").matches;
			if (isCurrentlyMobile) {
				applyFiltersToUrl(searchParams, activeRef.current, setSearchParams);
			}
		};
	}, [searchParams, setSearchParams]);

	const handleSearchChange = useCallback((value: string) => {
		setActive((prev) => ({ ...prev, titleOrDescription: value }));
	}, []);

	const toggle = useCallback((filterType: keyof ActiveState, value: string) => {
		setActive((prev) => {
			// Защита: приводим к массиву, даже если там прилетела строка или undefined
			const currentValues = Array.isArray(prev[filterType])
				? (prev[filterType] as string[])
				: prev[filterType]
					? [prev[filterType] as string]
					: [];

			// Теперь TypeScript уверен, что currentValues — это массив, и .filter() сработает без ошибок
			const nextValues = currentValues.includes(value)
				? currentValues.filter((v) => v !== value)
				: [...currentValues, value];

			return { ...prev, [filterType]: nextValues };
		});
	}, []);


	// --- ЗАПРОСЫ ДАННЫХ С СЕРВЕРА ---
	const { data: skillsData, isFetching: isSkillsLoading } = useGetSkillsQuery();
	const { data: specializationsData, isFetching: isSpecializationsLoading } = useGetSpecializationsQuery();

	const skills = skillsData?.data ?? [];
	const specializations = specializationsData?.data ?? [];
	const isLoading = isSkillsLoading || isSpecializationsLoading;

	// --- МЕМОИЗИРОВАННЫЕ ЧИПСЫ ---
	const memoizedStatus = useMemo(() => {
		return statuses.map((item) => (
			<Chip
				key={item.id}
				active={active.status.includes(item.id.toString())}
				onClick={() => toggle("status", item.id.toString())}
			>
				{item.name}
			</Chip>
		));
	}, [statuses, active.status, toggle]);

	const memoizedSpecializations = useMemo(() => {
		return specializations.map((item: SpecializationItem) => (
			<Chip
				key={item.id}
				active={active.specializationId.includes(item.id.toString())}
				onClick={() => toggle("specializationId", item.id.toString())}
			>
				{item.title}
			</Chip>
		));
	}, [specializations, active.specializationId, toggle]);

	const memoizedSkills = useMemo(() => {
		return skills.map((item: SkillsItem) => (
			<Chip
				key={item.id}
				active={active.skills.includes(String(item.id))}
				onClick={() => toggle("skills", String(item.id))}
			>
				{item.title}
			</Chip>
		));
	}, [skills, active.skills, toggle]);

	const memoizedLevels = useMemo(() => {
		return LEVELS.map((item) => (
			<Chip
				key={item.name}
				active={active.complexity.includes(item.name)}
				onClick={() => toggle("complexity", item.name)}
			>
				{item.name}
			</Chip>
		));
	}, [active.complexity, toggle]);

	const memoizedRatings = useMemo(() => {
		return RATINGS.map((item) => (
			<Chip
				key={item.id}
				active={active.rate.includes(item.name)}
				onClick={() => toggle("rate", item.name)}
			>
				{item.name}
			</Chip>
		));
	}, [active.rate, toggle]);

	return (
		<div className={styles.filtersModalWrapper}>
			<SearchInput value={active.titleOrDescription} onChange={handleSearchChange} />

			<Section title="Специализация" isLoading={isLoading} expanded={true} expandCount={5}>
				{memoizedSpecializations}
			</Section>

			<Section title="Навыки" isLoading={isLoading} expanded={true} expandCount={8}>
				{memoizedSkills}
			</Section>

			<Section title="Уровень сложности" isLoading={isLoading}>
				{memoizedLevels}
			</Section>

			<Section title="Рейтинг" isLoading={isLoading}>
				{memoizedRatings}
			</Section>

			<Section title="Статус" isLoading={isLoading}>
				{memoizedStatus}
			</Section>
		</div>
	);
}
