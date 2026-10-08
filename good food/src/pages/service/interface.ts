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
    ПросроченнаяДебиторка_15?: number
    ПросроченнаяДебиторка_15_30?: number
    ПросроченнаяДебиторка_30_60?: number
    ПросроченнаяДебиторка_60_90?: number
    ПросроченнаяДебиторка_90?: number
    ПросроченнаяДебиторка_Итого?: number
    ПросроченнаяКредиторка_15?: number
    ПросроченнаяКредиторка_15_30?: number
    ПросроченнаяКредиторка_30_60?: number
    ПросроченнаяКредиторка_60_90?: number
    ПросроченнаяКредиторка_90?: number
    ПросроченнаяКредиторка_Итого?: number
    СтатусОстатков_вопрос_14_НормаЗапаса?: string | number
    СтатусОстатков_вопрос_14_Мало?: string | number
    СтатусОстатков_вопрос_14_НетВНаличии?: string | number
    [key: `ПродажиПоФилиалам_${string}`]: string | number | undefined
    [key: `СтатусОстатков_${string}`]: string | number | undefined
    [key: `РасчётныйСчёт_${string}`]: number | undefined
    [key: `РасчетныйСчет_${string}`]: number | undefined
    [key: `Касса_${string}`]: number | undefined
    [key: `Топ10ТоваровПоПродажам_${string}`]: number | undefined
    [key: `Топ10ТоваровПоПрдажам_${string}`]: number | undefined
    [key: string]: number | string | null | undefined | unknown
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