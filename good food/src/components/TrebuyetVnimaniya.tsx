import { Bell, AlertTriangle } from "lucide-react"

interface AlertItem {
  id: number
  text: string
  time: string
  type: "danger" | "warning" | "success"
}

const alertsData: AlertItem[] = [
  {
    id: 1,
    text: "На складе Ташкент закончились Анкеры 10х100 (остаток 0 шт)",
    time: "08:25",
    type: "danger",
  },
  {
    id: 2,
    text: "Выполнение плана в Самарканде только 81%",
    time: "08:20",
    type: "warning",
  },
  {
    id: 3,
    text: "Просроченная дебиторская задолженность превысила 500 млн сум",
    time: "08:15",
    type: "danger",
  },
  {
    id: 4,
    text: "Неликвидный товар превышает 1,2 млрд сум",
    time: "08:10",
    type: "warning",
  },
  {
    id: 5,
    text: "Остаток наличных в кассе Фергана превышает лимит",
    time: "08:05",
    type: "warning",
  },
  {
    id: 6,
    text: "Поступление товара на склад Ташкент по накладной №1256",
    time: "08:00",
    type: "success",
  },
]

export function TrebuyetVnimaniya() {
  const getIconColor = (type: AlertItem["type"]) => {
    switch (type) {
      case "danger":
        return "text-red-500 fill-red-500/20"
      case "warning":
        return "text-amber-500 fill-amber-500/20"
      case "success":
        return "text-emerald-500 fill-emerald-500/20"
    }
  }

  return (
    <div className="w-full h-full">
      <div className="bg-gray-800/40 border border-zinc-800/60 rounded-xl p-3.5 sm:p-5 select-none h-full flex flex-col">
        {/* Header Title */}
        <div className="mb-3 pb-2.5 sm:pb-3 border-b border-zinc-800/40 flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-indigo-400 shrink-0" />
          <h2 className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase leading-none">
            ТРЕБУЕТ ВНИМАНИЯ
          </h2>
        </div>

        {/* Alerts List */}
        <div className="flex flex-col divide-y divide-zinc-800/20">
          {alertsData.map((item) => (
            <div
              key={item.id}
              className="py-2.5 flex items-start gap-3 px-1.5 -mx-1.5 rounded-lg hover:bg-zinc-800/20 transition-colors"
            >
              <AlertTriangle
                className={`w-4 h-4 shrink-0 mt-0.5 ${getIconColor(item.type)}`}
              />
              <span className="text-zinc-200 text-xs leading-snug flex-1">
                {item.text}
              </span>
              <span className="text-zinc-500 text-xs shrink-0 font-normal ml-2">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
