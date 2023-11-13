export const onClickOutside = (
  { target }: Event,
  callback: () => void,
  container?: HTMLElement,
  useCapture?: boolean
) => {
  const targetEl = target as HTMLElement;

  const isClickOutside =
    !container || useCapture
      ? !container?.contains(targetEl)
      : !targetEl?.closest(`#${container.id}`) &&
        document.body.contains(targetEl);

  if (isClickOutside) {
    callback.apply(this);
  }
};
