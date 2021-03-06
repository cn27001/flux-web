import Vuex, { StoreOptions } from 'vuex';
import { root } from './root/index';
import { RootState } from './types/RootState';
import {actions} from '~/store/root/actions';
import {mutations} from '~/store/root/mutations';
import {getters} from '~/store/root/getters';
import { workloads } from './workloads/index';
import { namespaces } from './namespaces/index';


const store: StoreOptions<RootState> = {
    state: root,
    getters,
    actions,
    mutations,
    modules: {
        workloads,
        namespaces,
    },
};

export default () => new Vuex.Store<RootState>(store);
