import {IOption} from "../../common/default-models";

export const importExport: IOption[] = [
  { name: 'Импорт', value: 1 },
  { name: 'Импорт и экспорт', value: 2 },
  { name: 'Экспорт', value: 3 },
];

export const weights: IOption[] = [
  { name: 'Кг.', value: 1 },
  { name: 'Тонна', value: 2 },
];
export const costs: IOption[] = [
  { name: 'Долл.', value: 1 },
  { name: 'Тыс. долл.', value: 2 },
  { name: 'Млн. долл.', value: 3 },
];

// Тут должны быть еще параметры, но эп на Страны, федеральные округа и т.д. не готовы
