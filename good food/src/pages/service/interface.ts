export interface StatsCard {
    ПродажиСегодня?: number
    ПродажиИзменениеДень?: number
    ПродажиПериод?: number
    ПродажиИзменениеПериод?: number
    ВаловаяПрибыль?: number
    ВаловаяПрибыльИзменение?: number
    ОстатокТовара?: number
    ОстатокТовараИзменение?: number
    ДеньгиНаСчетах?: number
    ДеньгиНаСчетахИзменение?: number
    ДеньгиВКассах?: number
    ДеньгиВКассахИзменение?: number
    ДебиторскаяЗадолженность?: number
    ДебиторскаяЗадолженностьИзменение?: number
    НеликвидныйТовар_30дней?: number
    НеликвидныйТоварИзменение_30дней?: number
    ПросроченнаяДебиторка?: number
    ПросроченнаяДебиторкаИзменение?: number
    [key: `РасчётныйСчёт_${string}`]: number | undefined
    [key: `Касса_${string}`]: number | undefined
    [key: string]: number | string | null | undefined
}

export interface IlliquidProductItem {
    Товар?: string
    Номенклатура?: string
    tovar?: string
    name?: string
    product?: string
    ТоварНаименование?: string

    Филиал?: string
    Склад?: string
    filial?: string
    branch?: string
    warehouse?: string
    Подразделение?: string

    Остаток?: string | number
    Количество?: string | number
    ostatok?: string | number
    qty?: string | number
    quantity?: string | number

    Сумма?: string | number
    summa?: string | number
    amount?: string | number
    Стоимость?: string | number
    sum?: string | number

    БезДвижения?: string | number
    Дней?: string | number
    ДнейБезДвижения?: string | number
    days?: string | number
    Срок?: string | number

    [key: string]: unknown
}