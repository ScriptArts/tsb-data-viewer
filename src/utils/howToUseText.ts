import { SlotId, TriggerId } from '../types/Artifact';

const slotText = (slotId: SlotId) => {
    switch (slotId) {
        case 'auto': return 'どちらかの手に所持';
        case 'mainhand': return 'メインハンドに所持';
        case 'offhand': return 'オフハンドに所持';
        case 'head':
        case 'chest':
        case 'legs':
        case 'feet': return '装備';
        case 'inventory': return 'インベントリ内に保持';
        case 'hotbar': return 'ホットバーに保持';
    }
};

const triggerText = (triggerId: TriggerId) => {
    switch (triggerId) {
        case 'onClick': return '右クリック';
        case 'shot': return '発射';
        case 'itemUse': return '使用';
        case 'passive': return 'ている限り';
        case 'onAttack': return 'Entityを攻撃';
        case 'onAttackByMelee': return 'Entityを近接攻撃';
        case 'onAttackByProjectile': return 'Entityを遠距離攻撃';
        case 'onDamage': return '被ダメージ';
        case 'onDamageFromExplode': return '被爆発ダメージ';
        case 'onDamageFromBurn': return '被延焼ダメージ';
        case 'onDamageFromEntity': return '被攻撃ダメージ';
        case 'onDamageFromMelee': return '被近接ダメージ';
        case 'onDamageFromProjectile': return '被遠距離ダメージ';
        case 'onKilled': return 'Entityを殺害';
        case 'onKilledByMelee': return 'Entityを近接攻撃で殺害';
        case 'onKilledByProjectile': return 'Entityを遠距離攻撃で殺害';
        case 'sneak': return 'スニーク';
        case 'sneak1s': return '1秒間スニーク';
        case 'sneak2s': return '2秒間スニーク';
        case 'sneak3s': return '3秒間スニーク';
        case 'sneak4s': return '4秒間スニーク';
        case 'sneak5s': return '5秒間スニーク';
        case 'sneak10s': return '10秒間スニーク';
        case 'keepSneak': return '0秒以上スニーク';
        case 'keepSneak1s': return '1秒間以上スニーク';
        case 'keepSneak2s': return '2秒間以上スニーク';
        case 'keepSneak3s': return '3秒間以上スニーク';
        case 'keepSneak4s': return '4秒間以上スニーク';
        case 'keepSneak5s': return '5秒間以上スニーク';
        case 'keepSneak10s': return '10秒間以上スニーク';
        case 'equipping': return '';
    }
};

export const howToUseText = (slotId: SlotId, triggerId: TriggerId) => {
    // TODO: TSBから取ってきたい…
    let a = slotText(slotId);
    let ab = triggerId === 'equipping' ? '' : 'し';
    let b = triggerText(triggerId);

    return `${a}${ab}${b}`;
};
