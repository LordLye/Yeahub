import { FiltersModal } from './ui/FiltersModal/FiltersModal';
import { SearchInput } from './ui/SearchInput';

export { FiltersModal, SearchInput }

export { default as productFilterReducer } from './model/slice';

export {
    openMobileFilters,
    closeMobileFilters,
    toggleMobileFilters
} from './model/slice';

export { selectIsFilterOpen } from './model/slice';
