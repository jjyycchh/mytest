#encoding:utf-8
__author__ = 'Leo'
import os
import sys
import re
import json
from BeautifulSoup import BeautifulSoup

def get_default_permission():
    perm = dict()
    perm['accountId'] = []
    perm['accountType'] = [
        "SUPER_MAN",
        "ADMINISTRATOR",
        "REPRESENTATIVE",
        "MERCHANT"
    ]
    return perm

def get_platform_server():
    return "http://www.51iwifi.com/"


def get_tag_html(tag):
    return "".join([str(x) for x in tag.contents])

def replace_variables(tag, data_dict):
    for v in tag.findAll(attrs={'class': re.compile('siteValue')}):
        key = v.get("id")
        if key:
            orig = get_tag_html(v)
            placeholder = '{%=' + key + '%}'
            data_dict[key] = orig
            #replace_list.append({'orig': orig, 'placeholder': placeholder})
            print "common value: %s" % key
            v.clear()
            v.insert(1, placeholder)


    for v in tag.findAll(attrs={'class': re.compile('siteResource')}):
        key = v.get("id")
        v_src = v.get('src')
        v_href = v.get('href')
        if key:
            if v_src:
                orig = v['src']
                placeholder = '{@=' + key + '@}'
                v['src'] = placeholder
                data_dict[key] = orig
                print "resource src value: %s" % key
            if v_href:
                orig = v['href']
                placeholder = '{@=' + key + '@}'
                v['href'] = placeholder
                data_dict[key] = orig
                print "resource href value: %s" % key

    for v in tag.findAll(attrs={'class': re.compile('siteSource')}):
        key = v.get("id")
        v_src = v.get('src')
        v_href = v.get('href')
        if key:
            if v_src:
                orig = v['src']
                placeholder = '{@#' + key + '@}'
                v['src'] = placeholder
                data_dict[key] = orig
                print "source src value: %s" % key
            if v_href:
                orig = v['href']
                placeholder = '{@#' + key + '@}'
                v['href'] = placeholder
                data_dict[key] = orig
                print "source href value: %s" % key

    for v in tag.findAll(attrs={'class': re.compile('siteLink')}):
        key = v.get("id")
        v_src = v.get('src')
        v_href = v.get('href')
        if key:
            if v_src:
                orig = v['src']
                placeholder = '{@' + key + '@}'
                v['src'] = placeholder
                data_dict[key] = orig
                print "site link src value: %s" % key
            if v_href:
                orig = v['href']
                placeholder = '{@' + key + '@}'
                v['href'] = placeholder
                data_dict[key] = orig
                print "site link href value: %s" % key

# components.append({'id': key, 'innerHtml': orig})
def extract_component(c):
    innerHtml = c['innerHtml']
    html_sp = BeautifulSoup(innerHtml)
    html_tag = html_sp.find(attrs={'class': re.compile('siteComponent')})
    data_dict = dict()
    print "Extracting component %s" % c['id']

    replace_variables(html_tag, data_dict)
    # innerHtml = str(html_sp)
    # for var in replace_list:
    #     innerHtml.replace(var['orig'], var['placeholder'])

    com_t = dict()
    com_d = dict()

    com_t['componentid'] = c['id']
    com_d['componentid'] = c['id']

    com_t['content'] = str(html_tag)
    com_d['content'] = data_dict

    com_t['permission'] = get_default_permission()
    com_d['permission'] = {}

    return com_t, com_d


def extract_components(components_list):
    m_list = list()
    d_list = list()
    for component in components_list:
        m, d = extract_component(component)
        m_list.append(m)
        d_list.append(d)

    return m_list, d_list

def extract_auth_module(m):
    module_t = dict()
    module_d = dict()
    innerHtml = m['innerHtml']
    html_sp = BeautifulSoup(innerHtml)
    html_tag = html_sp.find(attrs={'class': re.compile('siteModule')})

    print "Extracting auth module %s" % m['id']

    auth_html_code = get_tag_html(html_tag)
    data_dict = dict()
    data_dict['auth_html_code'] = auth_html_code

    #innerHtml.replace(auth_html_code, "{%=auth_html_code%}")
    html_tag.clear()
    html_tag.insert(1, "{%=auth_html_code%}")
    html_tag['platSvrAddr'] = "{%=platSvrAddr%}"
    # html_sp = BeautifulSoup(innerHtml)
    # html_sp.contents[0]['platSvrAddr'] = "{%=platSvrAddr%}"

    data_dict['platSvrAddr'] = get_platform_server()

    innerHtml = str(html_tag)
    module_t['moduleid'] = m['id']
    module_t['layout'] = innerHtml

    module_d['moduleid'] = m['id']
    module_d['layout'] = data_dict

    module_t['type'] = "auth"
    module_d['type'] = ""

    module_t['permission'] = get_default_permission()
    module_d['permission'] = {}

    return module_t, module_d

def extract_module(m):
    innerHtml = m['innerHtml']
    html_sp = BeautifulSoup(innerHtml)
    if html_sp.contents[0]['class'].find('siteAuthModule') >= 0:
        return extract_auth_module(m)

    print "Extracting module %s" % m['id']
    components = list()
    # components_replace = list()
    for v in html_sp.findAll(attrs={'class': re.compile('siteComponent')}):
        key = v.get("id")
        if key:
            #orig = get_tag_html(v)
            orig = str(v)
            placeholder = '{{' + key + '}}'
            components.append({'id': key, 'innerHtml': orig})
            v.replaceWith(placeholder)
            #components_replace.append({'orig': orig, 'placeholder': placeholder})

    # for var in components_replace:
    #     innerHtml.replace(var['orig'], var['placeholder'])

    #html_sp = BeautifulSoup(innerHtml)
    html_tag = html_sp.find(attrs={'class': re.compile('siteModule')})
    data_dict = dict()
    #replace_list = list()
    replace_variables(html_tag, data_dict)
    # innerHtml = str(html_sp)
    # for var in replace_list:
    #     innerHtml.replace(var['orig'], var['placeholder'])

    module_t = dict()
    module_d = dict()
    module_t['moduleid'] = m['id']
    module_t['layout'] = str(html_tag)
    module_d['moduleid'] = m['id']
    module_d['layout'] = data_dict

    module_t['type'] = "general"
    module_d['type'] = ""

    module_t['permission'] = get_default_permission()
    module_d['permission'] = {}

    module_t['components'], module_d['components'] = extract_components(components)

    return module_t, module_d


# return template and data dict structure
#  modules.append({'id': key, 'innerHtml': orig})
def extract_modules(modules_list):
    m_list = list()
    d_list = list()
    for module in modules_list:
        m, d = extract_module(module)
        m_list.append(m)
        d_list.append(d)

    return m_list, d_list


def extract_file(f):
    try:
        htmlFile = open(f, "r")
        soup = BeautifulSoup(htmlFile.read())
        template = dict()
        data = dict()
        # find all javascripts

        orig_html = str(soup)
        # find all modules
        modules = list()
        #modules_replace = list()
        print "Extracting module contents..."
        for v in soup.findAll(attrs={'class': re.compile('siteModule')}):
            key = v.get("id")
            if key:
                #orig = get_tag_html(v)
                orig = str(v)
                placeholder = '{{'+key+'}}'
                modules.append({'id': key, 'innerHtml': orig})
                #modules_replace.append({'orig': orig, 'placeholder': placeholder})
                v.replaceWith(placeholder)

        #for var in modules_replace:
        #    orig_html.replace(str(var['orig']), str(var['placeholder']))

        # update the new soup for parsing new template
        #s1 = BeautifulSoup(orig_html)
        s1 = soup

        print "Extracting javascript files..."
        scripts_list = list()
        all_scripts = s1.findAll('script', src=True)
        if len(all_scripts) > 0:
            scripts_list.append(all_scripts[0].get('src'))
            print "javascript src: %s" % all_scripts[0].get('src')
            all_scripts[0].replaceWith('{#script#}')
            if len(all_scripts) > 1:
                for s in all_scripts[1:]:
                    scripts_list.append(s.get('src'))
                    print "javascript src: %s" % s.get('src')
                    s.replaceWith('')

        # find all css links
        print "Extracting css files..."
        css_list = list()
        all_css = s1.findAll('link')
        if len(all_css) > 0:
            css_list.append(all_css[0].get('href'))
            print "css href: %s" % all_css[0].get('href')
            all_css[0].replaceWith('{#css#}')
            if len(all_css) > 1:
                for s in all_css[1:]:
                    css_list.append(s.get('href'))
                    print "css href: %s" % s.get('href')
                    s.replaceWith('')

        # find all variables in head
        print "Extracting head variables..."
        head_vals = dict()
        head_tag = s1.find('head')
        replace_variables(head_tag, head_vals)

        # find all variables in body
        print "Extracting body variables..."
        body_vals = dict()
        body_tag = s1.find('body')
        replace_variables(body_tag, body_vals)

        # some attributes have been updated, original html should be re-dump
        orig_html = str(s1)
        header_html = orig_html[0:orig_html.find('<body>')] + '<body>'
        body_html = get_tag_html(soup.find('body'))  # ignore <body>
        footer_html = orig_html[orig_html.find('</body>'):]

        template['layout'] = dict()
        data['layout'] = dict()

        #
        # # replace variable
        # for var in vals_replace:
        #     header_html.replace(var['orig'], var['placeholder'])
        #     body_html.replace(var['orig'], var['placeholder'])
        #     footer_html.replace(var['orig'], var['placeholder'])


        template['layout']['header'] = header_html
        template['layout']['body'] = body_html
        template['layout']['footer'] = footer_html
        template['layout']['script'] = scripts_list
        template['layout']['css'] = css_list

        data['layout']['header'] = head_vals
        data['layout']['body'] = body_vals
        data['layout']['footer'] = ""
        data['layout']['script'] = ""
        data['layout']['css'] = ""

        template['modules'], data['modules'] = extract_modules(modules)

        htmlFile.close()
        htmlFile = None
        try:
            template_f = open(f+'_template.txt', "w")
            template_f.write(json.dumps(template))
            template_f.close()
            template_f = None
            print "Save template file: %s_template.txt" % f
        finally:
            if template_f is not None:
                template_f.close()

        try:
            data_f = open(f+'_data.txt', "w")
            data_f.write(json.dumps(data))
            data_f.close()
            data_f = None
            print "Save data file: %s_data.txt" % f
        finally:
            if data_f is not None:
                data_f.close()

        print "*******OK********"
    except Exception as e:
        print "Invalid file content"
    finally:
        if htmlFile is not None:
            htmlFile.close()


def usage():
    print "page_extration <file>"

if __name__ == '__main__':
    try:
        if len(sys.argv) != 2:
            print "Need more arguments. (%d)" % len(sys.argv)
            raise ValueError

        extract_file(sys.argv[1])
    except ValueError:
        usage()
    except:
        print "Failed to parse html file"
