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