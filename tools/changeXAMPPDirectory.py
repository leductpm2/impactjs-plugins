import re
import os
import glob
import sys

source_dir=os.getcwd()
replace_dir=os.path.join(source_dir, sys.argv[1])
replace_dir=replace_dir.replace('\\', '/')
source_file="D:\Devtools\XAMPP\\apache\conf\httpd-backup.conf"
target_file="D:\Devtools\XAMPP\\apache\conf\httpd.conf"
restart_file="D:\Devtools\XAMPP\\apache_restart.bat"

# check if target directory exists... if not, create it.
print(source_dir, replace_dir)
with open(source_file,'r') as sfile:
  with open(target_file,'w') as tfile:
     lines = sfile.readlines()
     for line in lines:
        string_to_search1 = 'DocumentRoot \"dir\"'
        string_to_search2 = '<Directory \"dir\">'
        if string_to_search1 in line:
            line =  'DocumentRoot \"'+replace_dir+'\"\n'
            print(line)          
        if string_to_search2 in line:
            line = '<Directory \"'+replace_dir+'\">\n'
            print(line)	          
        tfile.writelines(line)
print("DONE")