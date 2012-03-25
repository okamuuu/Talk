document.addEventListener('DOMContentLoaded', function() {
    var i = parseInt(location.pathname.replace('/', '')) || 0;
    var sections = [];
    $A(document.querySelectorAll('body > *')).forEach(function(element) {
        document.body.removeChild(element);
        var tag = element.tagName.toLowerCase();
        if (tag.match(/h[1-6r]/) || !sections.length) {
            var section = document.createElement('div');
            section.className = 'section';
            if (sections.length != i) {
                section.style.display = 'none';
            }
            if (tag != 'hr') {
                section.appendChild(element);
            }
            document.body.appendChild(section);
            sections.push(section);
        } else {
            if (tag == 'pre') {
                element.className = 'prettyprint';
            }
            sections[sections.length-1].appendChild(element);
        }
    });
    if (i < 0) i = 0;
    if (i >= sections.length) i = sections.length-1;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 37 && i > 0) {
            sections[i].style.display = 'none';
            i--;
            sections[i].style.display = 'block';
//            history.pushState('', '', '/' + (i ? i : ''));
        }
        if (e.keyCode == 39 && i < sections.length-1) {
            sections[i].style.display = 'none';
            i++;
            sections[i].style.display = 'block';
//            history.pushState('', '', '/' + i);
        }
    }, false);


    function adjustTextSize() {
        document.body.style.fontSize = Math.round(window.innerHeight / 40) + 'px'
    };
    adjustTextSize();
//    window.addEventListener('resize', adjustTextSize);

    function $A(list) {
        return Array.prototype.slice.call(list)
    }
}, false);

