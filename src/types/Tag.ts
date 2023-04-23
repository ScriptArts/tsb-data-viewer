interface NBT<T, V> {
    type: T;
    value: V;
}

export type ByteTag = NBT<'byte', number>;
export type ShortTag = NBT<'short', number>;
export type IntTag = NBT<'int', number>;
export type LongTag = NBT<'long', bigint>;
export type FloatTag = NBT<'float', number>;
export type DoubleTag = NBT<'double', number>;
export type StringTag = NBT<'string', string>;
export type ByteArrayTag = NBT<'byte_array', Int8Array>;
export type IntArrayTag = NBT<'int_array', Int32Array>;
export type LongArrayTag = NBT<'long_array', BigInt64Array>;
export type ListTag = NBT<'list', Tag[]>;
export type CompoundTag = NBT<'compound', Record<string, Tag>>;

export type Tag =
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
