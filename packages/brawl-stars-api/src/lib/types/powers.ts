interface Power {
	id: number;
	name: string;
}

export type StarPower = Power;
export type Gadget = Power;
export interface Gear extends Power {
	level: number;
}
