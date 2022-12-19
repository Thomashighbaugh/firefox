#!/bin/env bash
##########################################################
## TITLE:
##
## DESCRIPTION:
##
##
## AUTHOR: Thomas Leon Highbaugh <admin@thomasleonhighbaugh.me>
##########################################################

function recolor() {
     sed -i 's/fff/f4f4f7/g' *.svg
     sed -i 's/66cc52/44ddff/g' *.svg
     sed -i 's/60BF4c/2EEDAE/g' *.svg
     sed -i 's/e62117/BC124C/g' *.svg
     sed -i 's/0d131a/1b1d24/g' *.svg
     sed -i 's/55cc3d/2eedae/g' *.svg
     sed -i 's/ffcd02/ffffaf/g' *.svg
     sed -i 's/0A84FF/0badff/g' *.svg
     sed -i 's/999999/555566/g' *.svg
     sed -i 's/8c8c8c/555e70/g' *.svg

}
recolor
