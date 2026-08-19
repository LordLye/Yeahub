import { useCallback, useEffect, useMemo, useState } from "react";
import { Section } from "@/shared/ui/Section";
import { Modal } from "@/shared/ui/Modal";
import { Chip } from "@/shared/ui/Chip";
import { SearchInput } from "../SearchInput";

import {
	LEVELS,
	RATINGS,
	STATUSES,
} from "@/shared/constants/filters";
import { useSearchParams } from "react-router-dom";
import { useGetSkillsQuery, useGetSpecializationsQuery } from "../../api/filterApi";

import type { ActiveState, FiltersModalProps, SearchParamsLike, SpecializationItem, SkillsItem } from "./types"

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

	if (isChanged) {
		newParams.set("page", "1");
		setSearchParams(newParams, { replace: true });
	}
};

export function FiltersModal({ isOpen, setIsOpen }: FiltersModalProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [active, setActive] = useState<ActiveState>(() => getInitialState(searchParams));
	const [statuses] = useState(STATUSES);

	const { data: skillsData, isFetching: isSkillsLoading } = useGetSkillsQuery();
	const { data: specializationsData, isFetching: isSpecializationsLoading } = useGetSpecializationsQuery();
	const skills = skillsData?.data ?? [];
	const specializations = specializationsData?.data ?? [];

	const isLoading = isSkillsLoading || isSpecializationsLoading;

	useEffect(() => {
		if (isOpen) {
			setActive(getInitialState(searchParams));
		}
		// Синхронизируем только при открытии модалки, не при каждом изменении URL
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const handleClose = useCallback(() => {
		applyFiltersToUrl(searchParams, active, setSearchParams);
		setIsOpen(false);
	}, [active, searchParams, setSearchParams, setIsOpen]);

	const toggle = useCallback((filterType: keyof ActiveState, value: string) => {
		setActive((prev) => {
			const nextValues = prev[filterType].includes(value)
				? prev[filterType].filter((v) => v !== value)
				: [...prev[filterType], value];

			return { ...prev, [filterType]: nextValues };
		});
	}, []);

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

	console.log('STAAAAAAAAAAART MODAL', isSpecializationsLoading)

	return (
		<Modal isOpen={isOpen} onClose={handleClose}>
			<SearchInput />
			
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
		</Modal>
	);
}
