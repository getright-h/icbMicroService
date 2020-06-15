import { IOrganizationLeftState } from './organization-left.interface';
import { useStateStore } from '~/framework/aop/hooks/use-base-store';
import { useEffect } from 'react';

export function useOrganizationLeftStore() {
    const { state, setStateWrap } = useStateStore(new IOrganizationLeftState());
    useEffect(() => {

    }, []);

    // 根据根据系统id查找机构类型
    function queryOrganizationTypeListBySystemId() {
        
    }

    /**
     *
     * 根据父级Id查询子级机构
     * @param {string} id 父级id
     * @param {number} hierarchyType 查询的类型
     */
    function queryOrganizationChildByOrganizationId(id: string, hierarchyType: number) {

    }

    return { state }
}