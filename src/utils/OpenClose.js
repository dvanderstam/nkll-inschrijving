export const handleOpenClose = (currentDate, openDate, closeDate) => {
  const current = new Date(currentDate);
  const open = new Date(openDate);
  const close = new Date(closeDate);

  if (current >= close) {
    document.querySelectorAll('.open').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.closed').forEach(el => el.style.display = 'block');
  } else if (current >= open) {
    document.querySelectorAll('.open').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.closed').forEach(el => el.style.display = 'none');
  } else {
    document.querySelectorAll('.open').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.closed').forEach(el => el.style.display = 'block');
  }
};
