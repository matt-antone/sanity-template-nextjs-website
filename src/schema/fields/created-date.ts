export const createdDate = {
  name: "date",
  title: "Date",
  type: "datetime",
  validation: (Rule:any) => Rule.required(),
  options: {
    initialValue: new Date().toISOString(),
    dateFormat: 'MM/DD/YYYY',
    timeFormat: 'HH:mm',
    timeStep: 15,
    calendarTodayLabel: 'Today'
  },
  initialValue: () => new Date().toISOString(),
}