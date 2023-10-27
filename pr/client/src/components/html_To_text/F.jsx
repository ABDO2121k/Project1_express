import React from 'react';

function HtmlRenderer({ htmlContent }) {
  // Create a function to set the inner HTML with the provided content.
  const createMarkup = () => {
    return { __html: htmlContent };
  };

  return (
    <div dangerouslySetInnerHTML={createMarkup()} />
  );
}

export default HtmlRenderer;
