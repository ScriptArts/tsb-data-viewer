export type SlotId =
    | 'mainhand'
    | 'offhand'
    | 'feet'
    | 'legs'
    | 'chest'
    | 'head'
    | 'inventory'
    | 'hotbar'
    | 'auto';

export type TriggerId =
    | 'onClick'
    | 'shot'
    | 'itemUse'
    | 'onAttack'
    | 'onAttackByMelee'
    | 'onAttackByProjectile'
    | 'onDamage'
    | 'onDamageFromExplode'
    | 'onDamageFromBurn'
    | 'onDamageFromEntity'
    | 'onDamageFromMelee'
    | 'onDamageFromProjectile'
    | 'onKilled'
    | 'onKilledByMelee'
    | 'onKilledByProjectile'
    | 'equipping'
    | 'sneak'
    | 'sneak1s'
    | 'sneak2s'
    | 'sneak3s'
    | 'sneak4s'
    | 'sneak5s'
    | 'sneak10s'
    | 'keepSneak'
    | 'keepSneak1s'
    | 'keepSneak2s'
    | 'keepSneak3s'
    | 'keepSneak4s'
    | 'keepSneak5s'
    | 'keepSneak10s'
    | 'passive'
    | 'rejoin';

export type AttackType =
    | 'Physical'
    | 'Magic';
export type ElementType =
    | 'Fire'
    | 'Water'
    | 'Thunder'
    | 'None';

export type IsRangeAttack =
    | 'never'
    | 'probability'
    | 'condition'
    | 'every';

export type God =
    | 'Flora'
    | 'Urban'
    | 'Nyaptov'
    | 'Wi-ki'
    | 'Rumor';

export type TextComponent = {
    text?: string;
    color?: string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    storage?: string;
    nbt?: string;
};

export type AttackInfo = {
    damage?: unknown | unknown[];
    attackType?: AttackType[];
    elementType?: ElementType[];
    bypassResist?: boolean;
    isRangeAttack?: IsRangeAttack;
    attackRange?: unknown;
};

export type ByteTag = {
    type: 'byte';
    value: number;
};
export type ShortTag = {
    type: 'short';
    value: number;
};
export type IntTag = {
    type: 'int';
    value: number;
};
export type LongTag = {
    type: 'long';
    value: bigint;
};
export type FloatTag = {
    type: 'float';
    value: number;
};
export type DoubleTag = {
    type: 'double';
    value: number;
};
export type StringTag = {
    type: 'string';
    value: string;
};
export type ByteArrayTag = {
    type: 'byte_array';
    value: Int8Array;
};
export type IntArrayTag = {
    type: 'int_array';
    value: Int32Array;
};
export type LongArrayTag = {
    type: 'long_array';
    value: BigInt64Array;
};
export type ListTag = {
    type: 'list';
    value: NBTag[];
};
export type CompoundTag = {
    type: 'compound';
    value: Record<string, NBTag>;
};
export type NBTag =
    | ByteTag
    | ShortTag
    | IntTag
    | LongTag
    | FloatTag
    | DoubleTag
    | StringTag
    | ByteArrayTag
    | IntArrayTag
    | LongArrayTag
    | ListTag
    | CompoundTag;

export type Artifact = {
    id: number;
    item: string;
    name: TextComponent | TextComponent[];
    lore: (TextComponent | TextComponent[])[];
    costText?: TextComponent;
    remainingCount?: number;
    slot: SlotId;
    trigger: TriggerId;
    condition?: TextComponent;
    attackInfo?: AttackInfo;
    mpCost: number;
    mpRequire?: number;
    localCooldown?: number;
    specialCooldown?: number;
    disableCooldownMessage?: boolean;
    canUsedGod: 'ALL' | God[];
    customNbt?: CompoundTag;
};
