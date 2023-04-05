#!/bin/sh
set -e
if test "$CONFIGURATION" = "Debug"; then :
  cd /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2
  make -f /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2/CMakeScripts/ReRunCMake.make
fi
if test "$CONFIGURATION" = "Release"; then :
  cd /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2
  make -f /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2/CMakeScripts/ReRunCMake.make
fi
if test "$CONFIGURATION" = "MinSizeRel"; then :
  cd /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2
  make -f /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2/CMakeScripts/ReRunCMake.make
fi
if test "$CONFIGURATION" = "RelWithDebInfo"; then :
  cd /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2
  make -f /Users/ingridoconnor/Desktop/graphics/code/graphics-project/grass-tutorial_codebase-master/build2/CMakeScripts/ReRunCMake.make
fi

