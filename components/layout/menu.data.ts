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
        name: 'Продукты',
        icon: 'ep:goods',
        url: '/products',
    },
    {
        name: 'Платежи',
        icon: 'ph:contactless-payment',
        url: '/payments',
    },
    {
        name: 'Заказы',
        icon: 'fluent:receipt-28-regular',
        url: '/orders',
    },
    {
        name: 'Клиенты',
        icon: 'mingcute:group-line',
        url: '/customers',
    },
    {
        name: 'Отзывы',
        icon: 'fluent:person-feedback-48-regular',
        url: '/feedback',
    },
    {
        name: 'Настройки',
        icon: 'radix-icons:gear',
        url: '/settings',
    },
    {
        name: 'Поддержка',
        icon: 'radix-icons:question-mark',
        url: '/help',
    },
]
