import { Role } from '../../common/enums/rol.enum';
export declare function Auth(...roles: Role[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
