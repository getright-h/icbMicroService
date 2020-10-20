import { IMoveTemplateState, TREE_MAP } from './move-template.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect, useContext } from 'react';
import { WarehouseListService } from '~/solution/model/services/warehouse-list.service';
import { dealWithTreeData } from '~/framework/util/common/treeFunction';
import { QueryStoreOrganizationReturn } from '~/solution/model/dto/warehouse-list.dto';
import { GlobalContext } from '~/solution/context/global/global.provider';
import { IGlobalState } from '~/solution/context/global/global.interface';

export function useMoveTemplateStore() {
    const { state, setStateWrap } = useStateStore(new IMoveTemplateState());
    const warehouseListService: WarehouseListService = new WarehouseListService();
    const { gState }: IGlobalState = useContext(GlobalContext);
    useEffect(() => {
        queryOrganizationTypeListByTypeId();
    }, []);

      // 根据根据系统id查找机构类型
    function queryOrganizationTypeListByTypeId(id?: string) {
        warehouseListService.queryStoreOrganization({ typeId: gState.myInfo.typeId, id }).subscribe(res => {
        const treeData = dealWithTreeData<QueryStoreOrganizationReturn>(res, TREE_MAP, false);
            setStateWrap({
                treeData
            });
        });
    }
    return { state }
}