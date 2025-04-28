export interface IMenuItem {
    name: string
    url: string
    icon: string
}

export const MENU_DATA: IMenuItem[] = [
    {
        icon: 'radix-icons:dashboard',
        name: 'Главная',
        url: '/',
    },
    {
        icon: 'material-symbols:view-kanban',
        name: 'Канбан',
        url: '/kanban',
    },
    {
        name: 'Сотрудники',
        icon: 'mingcute:group-line',
        url: '/workers',
    },
    {
        name: 'Заказы',
        icon: 'fluent:receipt-28-regular',
        url: '/orders',
    },
]
