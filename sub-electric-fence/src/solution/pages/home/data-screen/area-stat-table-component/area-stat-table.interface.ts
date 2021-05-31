import { GpsPanelVehicleRegionDto } from '~/solution/model/dto/data-screen.dto';

/**
 * @export state变量定义和初始化
 * @class IAreaStatTableState
 */
export class IAreaStatTableState {
  scrollData: GpsPanelVehicleRegionDto[] = [];
}

/**
 * @export props变量定义和初始化
 * @class IAreaStatTableProps
 */
export class IAreaStatTableProps {
  propData: GpsPanelVehicleRegionDto[];
}
