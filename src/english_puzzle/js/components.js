export const elementCreatorWithParentAndChildren = (tagName, className, innerText, parent, children, idTitle, attribute, attributeValue) => {
  const newElement = document.createElement(`${tagName}`);
  if (className) newElement.classList.add(`${className}`);
  if (innerText) newElement.innerText = `${innerText}`;
  if (idTitle) newElement.id = idTitle;
  if (parent) parent.append(newElement);
  if (attribute) newElement.setAttribute(attribute, attributeValue);
  if (children) newElement.append(children);
};

export const elementCreator = (tagName, className, innerText, idTitle, attribute, attributeValue) => {
  const newElement = document.createElement(`${tagName}`);
  if (className) newElement.classList.add(`${className}`);
  if (innerText) newElement.innerText = `${innerText}`;
  if (idTitle) newElement.id = idTitle;
  if (attribute) newElement.setAttribute(attribute, attributeValue);
  return newElement;
};

