import { BUTTON, EVENTS } from "../const";

export function navigate(href) {
  window.history.pushState({}, "", href);
  // Crear un evento personalizado para avisar q cambiamos la url
  const navigationEvent = new Event(EVENTS.PUSHSTATE);
  window.dispatchEvent(navigationEvent);
}

export function Link({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTON.primary; //primary click
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    const isManageableEvent = target === undefined || target === "_self";

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault();
      navigate(to); //navegación con SPA
      window.scrollTo(0, 0);
    }
  };
  return <a onClick={handleClick} href={to} target={target} {...props} />;
}
