import React from 'react';
import './App.css'; // スタイルをインポート
import ExampleBlock from './ExampleBlock'; // ExampleBlockコンポーネントをインポート

// Temporal API のグローバル宣言
declare global {
  const Temporal: any;
}

export type Example = {
  title: string;
  codeBlocks: {
    code: string;
    exec: () => string;
  }[];
};

// Temporal APIが利用可能であることを確認
// ポリフィルがロードされているか、ブラウザがネイティブサポートしている必要があります
if (typeof Temporal === 'undefined') {
  console.error(
    'Temporal APIは現在の環境では利用できません。@js-temporal/polyfillがインストールされ、適切にロードされていることを確認してください。'
  );
}

const examples: Example[] = [
  {
    title: '1. 現在の時刻と日付の取得',
    codeBlocks: [
      {
        code: `const nowInstant = Temporal.Now.instant();`,
        exec: () => Temporal.Now.instant().toString(),
      },
      {
        code: `const nowZonedDateTime = Temporal.Now.zonedDateTimeISO();`,
        exec: () => Temporal.Now.zonedDateTimeISO().toString(),
      },
      {
        code: `const today = Temporal.Now.plainDateISO();`,
        exec: () => Temporal.Now.plainDateISO().toString(),
      },
      {
        code: `const currentTime = Temporal.Now.plainTimeISO();`,
        exec: () => Temporal.Now.plainTimeISO().toString(),
      },
    ],
  },
  {
    title: '2. 特定の日付と時刻の作成',
    codeBlocks: [
      {
        code: `const specificDate = new Temporal.PlainDate(2023, 10, 26);`,
        exec: () => new Temporal.PlainDate(2023, 10, 26).toString(),
      },
      {
        code: `const specificTime = new Temporal.PlainTime(14, 30, 0);`,
        exec: () => new Temporal.PlainTime(14, 30, 0).toString(),
      },
      {
        code: `const specificDateTime = new Temporal.PlainDateTime(2023, 10, 26, 14, 30, 0);`,
        exec: () =>
          new Temporal.PlainDateTime(2023, 10, 26, 14, 30, 0).toString(),
      },
      {
        code: `const parsedDate = Temporal.PlainDate.from("2024-05-15");`,
        exec: () => Temporal.PlainDate.from('2024-05-15').toString(),
      },
      {
        code: `const parsedDateTime = Temporal.PlainDateTime.from("2025-01-01T10:00:00");`,
        exec: () =>
          Temporal.PlainDateTime.from('2025-01-01T10:00:00').toString(),
      },
    ],
  },
  {
    title: '3. 日付と時刻の加算・減算',
    codeBlocks: [
      {
        code: `const baseDate = Temporal.PlainDate.from("2023-01-15");
const newDate = baseDate.add({ months: 1, days: 5 });`,
        exec: () => {
          const baseDate = Temporal.PlainDate.from('2023-01-15');
          return baseDate.add({ months: 1, days: 5 }).toString();
        },
      },
      {
        code: `const baseDate = Temporal.PlainDate.from("2023-01-15");
const previousDate = baseDate.subtract({ days: 3 });`,
        exec: () => {
          const baseDate = Temporal.PlainDate.from('2023-01-15');
          return baseDate.subtract({ days: 3 }).toString();
        },
      },
      {
        code: `const baseTime = Temporal.PlainTime.from("10:00:00");
const newTime = baseTime.add({ hours: 2, minutes: 30 });`,
        exec: () => {
          const baseTime = Temporal.PlainTime.from('10:00:00');
          return baseTime.add({ hours: 2, minutes: 30 }).toString();
        },
      },
      {
        code: `const baseDateTime = Temporal.PlainDateTime.from("2023-03-01T10:00:00");
const futureDateTime = baseDateTime.add({ years: 1, months: 2, days: 3, hours: 4, minutes: 5, seconds: 6 });`,
        exec: () => {
          const baseDateTime = Temporal.PlainDateTime.from(
            '2023-03-01T10:00:00'
          );
          return baseDateTime
            .add({
              years: 1,
              months: 2,
              days: 3,
              hours: 4,
              minutes: 5,
              seconds: 6,
            })
            .toString();
        },
      },
    ],
  },
  {
    title: '4. 期間の計算 (Difference)',
    codeBlocks: [
      {
        code: `const startDate = Temporal.PlainDate.from("2023-01-01");
const endDate = Temporal.PlainDate.from("2023-03-15");
const duration = startDate.until(endDate);`,
        exec: () => {
          const startDate = Temporal.PlainDate.from('2023-01-01');
          const endDate = Temporal.PlainDate.from('2023-03-15');
          const duration = startDate.until(endDate);
          return duration.toString();
        },
      },
      {
        code: `const startDate = Temporal.PlainDate.from("2023-01-01");
const endDate = Temporal.PlainDate.from("2023-03-15");
const daysBetween = startDate.until(endDate, { largestUnit: "days" });`,
        exec: () => {
          const startDate = Temporal.PlainDate.from('2023-01-01');
          const endDate = Temporal.PlainDate.from('2023-03-15');
          return startDate.until(endDate, { largestUnit: 'days' }).toString();
        },
      },
    ],
  },
  {
    title: '5. タイムゾーンの操作',
    codeBlocks: [
      {
        code: `const utcInstant = Temporal.Instant.from("2023-10-26T14:30:00Z");
const tokyoDateTime = utcInstant.toZonedDateTimeISO("Asia/Tokyo");`,
        exec: () => {
          const utcInstant = Temporal.Instant.from('2023-10-26T14:30:00Z');
          return utcInstant.toZonedDateTimeISO('Asia/Tokyo').toString();
        },
      },
      {
        code: `const utcInstant = Temporal.Instant.from("2023-10-26T14:30:00Z");
const londonDateTime = utcInstant.toZonedDateTimeISO("Europe/London");`,
        exec: () => {
          const utcInstant = Temporal.Instant.from('2023-10-26T14:30:00Z');
          return utcInstant.toZonedDateTimeISO('Europe/London').toString();
        },
      },
      {
        code: `const tokyoDateTime = Temporal.Instant.from("2023-10-26T14:30:00Z").toZonedDateTimeISO("Asia/Tokyo");
const tokyoToLondonConverted = tokyoDateTime.withTimeZone("Europe/London");`,
        exec: () => {
          const tokyoDateTime = Temporal.Instant.from(
            '2023-10-26T14:30:00Z'
          ).toZonedDateTimeISO('Asia/Tokyo');
          return tokyoDateTime.withTimeZone('Europe/London').toString();
        },
      },
      {
        code: `const tokyoDateTime = Temporal.Instant.from("2023-10-26T14:30:00Z").toZonedDateTimeISO("Asia/Tokyo");
const plainFromZoned = tokyoDateTime.toPlainDateTime();`,
        exec: () => {
          const tokyoDateTime = Temporal.Instant.from(
            '2023-10-26T14:30:00Z'
          ).toZonedDateTimeISO('Asia/Tokyo');
          return tokyoDateTime.toPlainDateTime().toString();
        },
      },
    ],
  },
  {
    title: '6. 日付と時刻の比較',
    codeBlocks: [
      {
        code: `const dateA = Temporal.PlainDate.from("2023-01-10");
const dateB = Temporal.PlainDate.from("2023-01-15");
dateA.equals(dateB);`,
        exec: () => {
          const dateA = Temporal.PlainDate.from('2023-01-10');
          const dateB = Temporal.PlainDate.from('2023-01-15');
          return dateA.equals(dateB).toString();
        },
      },
      {
        code: `const dateA = Temporal.PlainDate.from("2023-01-10");
const dateC = Temporal.PlainDate.from("2023-01-10");
dateA.equals(dateC);`,
        exec: () => {
          const dateA = Temporal.PlainDate.from('2023-01-10');
          const dateC = Temporal.PlainDate.from('2023-01-10');
          return dateA.equals(dateC).toString();
        },
      },
      {
        code: `const dateA = Temporal.PlainDate.from("2023-01-10");
const dateB = Temporal.PlainDate.from("2023-01-15");
Temporal.PlainDate.compare(dateA, dateB);`,
        exec: () => {
          const dateA = Temporal.PlainDate.from('2023-01-10');
          const dateB = Temporal.PlainDate.from('2023-01-15');
          return Temporal.PlainDate.compare(dateA, dateB).toString();
        },
      },
      {
        code: `const dateA = Temporal.PlainDate.from("2023-01-10");
const dateB = Temporal.PlainDate.from("2023-01-15");
Temporal.PlainDate.compare(dateB, dateA);`,
        exec: () => {
          const dateA = Temporal.PlainDate.from('2023-01-10');
          const dateB = Temporal.PlainDate.from('2023-01-15');
          return Temporal.PlainDate.compare(dateB, dateA).toString();
        },
      },
    ],
  },
  {
    title: '7. 日付のフォーマット',
    codeBlocks: [
      {
        code: `const date = Temporal.PlainDate.from("2023-10-26");
date.toLocaleString("ja-JP");`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-26');
          return date.toLocaleString('ja-JP');
        },
      },
      {
        code: `const date = Temporal.PlainDate.from("2023-10-26");
date.toLocaleString("en-US");`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-26');
          return date.toLocaleString('en-US');
        },
      },
      {
        code: `const dateTime = Temporal.PlainDateTime.from("2023-10-26T14:30:00");
dateTime.toLocaleString("ja-JP", {
year: "numeric",
month: "long",
day: "numeric",
hour: "2-digit",
minute: "2-digit"
});`,
        exec: () => {
          const dateTime = Temporal.PlainDateTime.from('2023-10-26T14:30:00');
          return dateTime.toLocaleString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        },
      },
    ],
  },
  {
    title: '8. 期間 (Duration) の操作',
    codeBlocks: [
      {
        code: `const duration = Temporal.Duration.from({ years: 1, months: 2, days: 3, hours: 4, minutes: 5 });`,
        exec: () => {
          const duration = Temporal.Duration.from({
            years: 1,
            months: 2,
            days: 3,
            hours: 4,
            minutes: 5,
          });
          return duration.toString();
        },
      },
      {
        code: `const duration1 = Temporal.Duration.from({ hours: 2, minutes: 30 });
const duration2 = Temporal.Duration.from({ hours: 1, minutes: 45 });
const totalDuration = duration1.add(duration2);`,
        exec: () => {
          const duration1 = Temporal.Duration.from({ hours: 2, minutes: 30 });
          const duration2 = Temporal.Duration.from({ hours: 1, minutes: 45 });
          return duration1.add(duration2).toString();
        },
      },
//       {
//         code: `const duration = Temporal.Duration.from({ hours: 5, minutes: 30 });
// const halfDuration = duration.multiply(0.5);`,
//         exec: () => {
//           const duration = Temporal.Duration.from({ hours: 5, minutes: 30 });
//           return duration.multiply(0.5).toString();
//         },
//       },
    ],
  },
  {
    title: '9. 曜日の取得',
    codeBlocks: [
      {
        code: `const date = Temporal.PlainDate.from("2023-10-26");
date.dayOfWeek; // 1=月曜日, 7=日曜日`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-26');
          return date.dayOfWeek.toString();
        },
      },
      {
        code: `const date = Temporal.PlainDate.from("2023-10-26");
const dayNames = ["", "月", "火", "水", "木", "金", "土", "日"];
dayNames[date.dayOfWeek];`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-26');
          const dayNames = ['', '月', '火', '水', '木', '金', '土', '日'];
          return dayNames[date.dayOfWeek];
        },
      },
    ],
  },
  {
    title: '10. 月の最初と最後の日',
    codeBlocks: [
      {
        code: `const date = Temporal.PlainDate.from("2023-10-15");
const firstDayOfMonth = date.with({ day: 1 });`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-15');
          return date.with({ day: 1 }).toString();
        },
      },
      {
        code: `const date = Temporal.PlainDate.from("2023-10-15");
const lastDayOfMonth = date.with({ day: date.daysInMonth });`,
        exec: () => {
          const date = Temporal.PlainDate.from('2023-10-15');
          return date.with({ day: date.daysInMonth }).toString();
        },
      },
    ],
  },
];

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Temporal API サンプルコードと実行結果</h1>
      <p>Firefox 137+</p>

      {examples.map((example, index) => (
        <div key={index}>
          <h2 className="section-title">{example.title}</h2>
          {example.codeBlocks.map((block, blockIndex) => (
            <ExampleBlock
              key={blockIndex}
              code={block.code}
              execFunction={block.exec}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
