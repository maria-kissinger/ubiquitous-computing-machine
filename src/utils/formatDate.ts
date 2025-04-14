export const formatDate = (dateInput: string | number): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}; 