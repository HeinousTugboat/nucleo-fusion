export interface Resource {
    current: number;
    total: number;
    rate?: number;
}


export interface Dependency {
    isFulfilled: () => boolean;
    name: string;
}


export interface Purchasable {
    name: string;
    getCost: () => number;
    checkAvailable: () => boolean;
    getValue: (totalRate: number) => number;
    purchase: () => number;
}
