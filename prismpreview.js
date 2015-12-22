var MutationObserver = window.MutationObserver  
                    || window.WebKitMutationObserver
                    || window.MozMutationObserver;
					
// 1. Define a callback function that will act on the mutations
var highlightCodeNode = function(mutations) {  
  mutations.forEach(function(mutation) {
	// We are only interested on mutation happening on the live preview node
	
    if (mutation.target.className != undefined &&
		// which has these classes :
        mutation.target.className == "rendered-markdown js-rendered-markdown ember-view rendered-markdown js-rendered-markdown") {
			
		// We look at each nodes inserted in the live preview
		//  to find the <code> block
      var addedNodes = [].slice.call(mutation.addedNodes);
      addedNodes.forEach(function(node) {
		  
		// The code block is not inserted directly
        //  but as part of a <p> or <pre> node
        // That's why we look at the children of the inserted node.
        if (node.childNodes != undefined) {
          var childNodes = [].slice.call(node.childNodes);
          childNodes.forEach(function(child) {
			// And if one of the children is a <code> block,
            if (child.nodeName == "CODE")
				// we use prism to highlight its content
              Prism.highlightElement(child);
          });
        }
      });
    }

  });
}
// 2. Create a MutationObserver object to register your callback.
var observer = new MutationObserver(highlightCodeNode);

// 3. Define where you want to observe mutations 
//         & what mutations you what to obsever.
observer.observe(document.body, { childList: true, subtree: true })

/** by Elie, src=http://ghost-313y33.rhcloud.com/2015/08/15/ghost-bring-prismjs-highlighting-to-ghost-editor/ **/
