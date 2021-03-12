var aid = articleid.split('&')[0];
document.writeln("<div id=\"uyan_frame\"></div>");
document.writeln("<script type=\"text/javascript\">");
document.writeln("var uyan_config = {");
document.writeln("\'du\':\'juanpi.yangtata.com\',");
document.writeln("\'su\':\'" + aid + "\'");
document.writeln("};");
document.writeln("</script>");
document.writeln("<script type=\"text/javascript\" id=\"UYScript\" src=\"http://v1.uyan.cc/js/iframe.js?UYUserId=1503970\" async=\"\"></script>");