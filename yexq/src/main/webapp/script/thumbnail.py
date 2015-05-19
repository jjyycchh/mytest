#encoding=utf-8
import Image
import os
import sys

def resize_image(infile, outfile=None, w=120, h=120):
    formatMap = {'png': 'png', 'jpg': 'jpeg', 'jpeg': 'jpeg'}
    f_name, f_ext = os.path.splitext(infile)

    if outfile is None:
        outfile = f_name + '_thumb' + f_ext

    maxSize = (w, h)
    try:
        image = Image.open(infile)
        image.thumbnail(maxSize, Image.ANTIALIAS)
        imgFormat = formatMap[f_ext[1:].lower()]
        image.save(outfile, imgFormat, optimize = True)
        print "resize thumbnail successfully "
        return True
    except Exception as ex:
        print "cannot create thumbnail for %s" % infile
        print str(ex)
        return False
    

if __name__ == '__main__':
    if len(sys.argv) < 5:
        print "usage: thumbnail <url> <width> <height> <outfile>"

    urlfile = sys.argv[1]
    thumb_width = sys.argv[2]
    thumb_height = sys.argv[3]
    outfile = sys.argv[4]
    _tmpfilename = '_tmp_file.jpg'
    # print "thumbnail %s %s %s %s" % (urlfile, thumb_width, thumb_height, outfile)

    # os.system('wkhtmltoimage --debug-javascript --run-script --enable-javascript --javascript-delay 3000 --quality 30 %s %s' % (urlfile, _tmpfilename))
    exec_result = os.system('/usr/local/bin/wkhtmltoimage --run-script --enable-javascript --quality 60 %s %s' % (urlfile, _tmpfilename))
    print "wkhtmltoimage execution result: '%s' " % exec_result
    resize_image(_tmpfilename, outfile=outfile, w=int(thumb_width), h=int(thumb_height))



