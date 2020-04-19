import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

export function dateCalendar(date) {

  const newDate = parseISO(date);

  return format(newDate, "dd'/'MM'/'yyyy", { locale: pt });
}

export function dateCalendarWithSpace(date) {

  const newDate = parseISO(date);

  return format(newDate, "dd' / 'MM' / 'yyyy", { locale: pt });
}
