import { type ReactNode, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, AvatarToken } from '@primer/react';
import snakeCase from 'just-snake-case';
import { useAppContext } from '../contexts/AppContext';
import { Title } from '../components/Title';
import { TextComponent } from '../components/TextComponent';
import { NbtTree } from '../components/NbtTree';
import { howToUseText } from '../utils/howToUseText';
import type { AttackType, ElementType, God, TextComponent as TextComponentType } from '../types/Artifact';

type SectionProps = {
    title: string;
    children: ReactNode;
};

type IconLabelProps = {
    text: string;
    src: string;
};

const Section = ({ title, children }: SectionProps) => (
    <>
        <Heading
            sx={{
                marginBottom: '1',
                paddingLeft: '1',
                color: 'accent.emphasis',
                fontSize: '2',
                borderBottom: '1px solid',
                borderColor: 'border.default',
            }}
        >{title}</Heading>
        <Box marginLeft='2'>
            {children}
        </Box>
    </>
);

const IconLabel = ({ text, src }: IconLabelProps) => {
    return (
        <Box
            as='span'
            marginRight='1'
            sx={{
                'img': {
                    borderRadius: 0,
                    boxShadow: 'none',
                    objectFit: 'contain',
                    imageRendering: 'pixelated',
                },
                'span': {
                    color: 'fg.default',
                },
            }}
        >
            <AvatarToken
                avatarSrc={src}
                text={text}
                size='large'
            />
        </Box>
    );
};

const AttackTypes = ({ values }: { values: AttackType[] }) => {
    const attackTypeText = useCallback((attackType: AttackType) => {
        switch (attackType) {
            case 'Physical': return '物理';
            case 'Magic': return '魔法';
        }
    }, []);

    return (
        <>
            {values.map((x, i) => (
                <IconLabel
                    key={i}
                    text={attackTypeText(x)}
                    src={`${BASE_URL}icon/attack_type/${snakeCase(x)}.png`}
                />
            ))}
        </>
    );
};
const ElementTypes = ({ values }: { values: ElementType[] }) => {
    const elementTypeText = useCallback((elementType: ElementType) => {
        switch (elementType) {
            case 'Fire': return '火';
            case 'Water': return '水';
            case 'Thunder': return '雷';
            case 'None': return '無';
        }
    }, []);

    return (
        <>
            {values.map((x, i) => (
                <IconLabel
                    key={i}
                    text={elementTypeText(x)}
                    src={`${BASE_URL}icon/element_type/${snakeCase(x)}.png`}
                />
            ))}
        </>
    );
};
const Gods = (props: { values: 'ALL' | God[] }) => {
    const values = useMemo<God[]>(() => {
        if (props.values instanceof Array) return props.values;
        else return ['Flora', 'Urban', 'Nyaptov', 'Wi-ki', 'Rumor'];
    }, [props]);

    const godText = useCallback((god: God) => {
        switch (god) {
            case 'Flora': return 'フローラ';
            case 'Urban': return 'ウルバン';
            case 'Nyaptov': return 'ニャプトフ';
            case 'Wi-ki': return 'ウィ＝キ';
            case 'Rumor': return 'ルーモア';
        }
    }, []);

    return (
        <>
            {values.map((x, i) => (
                <IconLabel
                    key={i}
                    text={godText(x)}
                    src={`${BASE_URL}icon/god/${snakeCase(x)}.png`}
                />
            ))}
        </>
    );
};

export const ArtifactDetail = () => {
    const { id } = useParams();
    const { artifacts } = useAppContext();

    const tickToTime = (tick: number) => {
        const ts = Math.round((tick / 20) * 10) / 10;
        const m = Math.floor(ts / 60);
        const s = ts % 60;

        return m <= 0
            ? `${s.toFixed(1)}秒`
            : `${m}分${s.toFixed(1)}秒`;
    };

    const artifact = useMemo(() => {
        if (!id || isNaN(parseInt(id))) return undefined;
        return artifacts.find(x => x.id === parseInt(id));
    }, [artifacts, id]);

    const attackInfo = useMemo<TextComponentType[]>(() => {
        if (!artifact || !artifact.attackInfo) return [];
        const arr: TextComponentType[] = [];

        const reset: TextComponentType = {
            text: '',
            color: 'white',
            bold: false,
            italic: false,
            underlined: false,
            strikethrough: false,
            obfuscated: false,
        };

        const {
            damage,
            bypassResist,
            isRangeAttack,
            attackRange,
        } = artifact.attackInfo;

        if (bypassResist) arr.push({ text: '[防御無効] ' });

        if (damage === undefined) arr.push({ text: '???' });
        else if (damage instanceof Array) {
            if (damage.length === 1) arr.push(damage[0]);
            else arr.push(damage[0], { text: '-' }, damage[1]);
        }
        else arr.push(damage);
        arr.push(reset);

        arr.push({ text: ' Damage ' });

        if (isRangeAttack) {
            if (isRangeAttack === 'never') arr.push({ text: '単体' });
            else {
                arr.push({ text: '範囲-' });
                if (isRangeAttack === 'probability') {
                    arr.push({ text: '確率', color: 'aqua' });
                }
                else if (isRangeAttack === 'condition') {
                    arr.push({ text: '条件', color: 'green' });
                }
                else {
                    arr.push({ text: '常時', color: 'gold' });
                }
            }
        }
        else {
            arr.push({ text: '範囲-' }, { text: '不明', color: 'gray' });
        }

        if (attackRange) {
            arr.push(
                { text: ' 範囲:', color: 'white' },
                attackRange,
                reset,
                { text: 'm' },
            );
        }

        return arr;
    }, [artifact]);

    return (
        <>
            <Title title='神器詳細' />

            <Box
                marginX='auto'
                marginY='3'
                paddingX='3'
                maxWidth='medium'
            >
                {artifact ? (
                    <>
                        <Box
                            marginTop='3'
                            padding='3'
                            backgroundColor='minecraft.tooltip.bg'
                            border='3px solid'
                            borderColor='minecraft.tooltip.border'
                            borderRadius='2'
                        >
                            <Box>
                                <Section title='ID'>
                                    {artifact.id}
                                </Section>
                            </Box>
                            <Box marginTop='2'>
                                <Section title='ベースアイテム'>
                                    {artifact.item}
                                </Section>
                            </Box>
                            <Box marginTop='2'>
                                <Section title='神器名'>
                                    <TextComponent raw={artifact.name} />
                                </Section>
                            </Box>
                            <Box marginTop='2'>
                                <Section title='説明'>
                                    {artifact.lore.map((lore, idx) => (
                                        <Box key={idx}>
                                            <TextComponent raw={lore} />
                                        </Box>
                                    ))}
                                </Section>
                            </Box>
                            <Box marginTop='2'>
                                <Section title='使用方法'>
                                    <TextComponent
                                        raw={{ text: howToUseText(artifact.slot, artifact.trigger) }}
                                    />
                                </Section>
                            </Box>
                            {artifact.mpRequire !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='必要MP'>
                                        <TextComponent
                                            raw={{ text: `${artifact.mpRequire}` }}
                                        />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.mpCost !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='消費MP'>
                                        <TextComponent
                                            raw={{ text: `${artifact.mpCost}` }}
                                        />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.costText !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='MP以外の消費物'>
                                        <TextComponent raw={artifact.costText} />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.remainingCount !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='使用回数'>
                                        <TextComponent
                                            raw={{ text: `${artifact.remainingCount}` }}
                                        />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.attackInfo !== undefined ? (
                                <>
                                    <Box marginTop='2'>
                                        <Section title='攻撃情報'>
                                            <TextComponent raw={attackInfo} />
                                        </Section>
                                    </Box>
                                    {artifact.attackInfo.attackType ? (
                                        <Box marginTop='2'>
                                            <Section title='攻撃タイプ'>
                                                <AttackTypes values={artifact.attackInfo.attackType} />
                                            </Section>
                                        </Box>
                                    ) : undefined}
                                    {artifact.attackInfo.elementType ? (
                                        <Box marginTop='2'>
                                            <Section title='攻撃属性'>
                                                <ElementTypes values={artifact.attackInfo.elementType} />
                                            </Section>
                                        </Box>
                                    ) : undefined}
                                </>
                            ) : undefined}
                            {artifact.localCooldown !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='クールダウン'>
                                        <TextComponent
                                            raw={{ text: `${tickToTime(artifact.localCooldown)}` }}
                                        />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.specialCooldown !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='特殊クールダウン'>
                                        <TextComponent
                                            raw={{ text: `${tickToTime(artifact.specialCooldown)}` }}
                                        />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.canUsedGod !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='扱える神'>
                                        <Gods values={artifact.canUsedGod} />
                                    </Section>
                                </Box>
                            ) : undefined}
                            {artifact.customNbt !== undefined ? (
                                <Box marginTop='2'>
                                    <Section title='カスタムNBT'>
                                        <NbtTree tag={artifact.customNbt} />
                                    </Section>
                                </Box>
                            ) : undefined}
                        </Box>
                    </>
                ) : <></>}
            </Box>
        </>
    );
};
