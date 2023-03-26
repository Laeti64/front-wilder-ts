export interface Wilder {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface WilderBody extends Omit<Wilder, "id"> {}

export interface Score {
  id: string;
  value: number;
  wilder: Wilder;
  skill: Skill;
}

export interface Skill {
  id: string;
  name: string;
}
export interface Note {
  skillId: string;
  skillLabel: string;
  value: number;
}
