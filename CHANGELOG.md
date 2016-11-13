# Changelog

## 0.5.2 (2016-11-13)

Changes:
    
    - added inputs/outputs for sorting (#14)
    
Bugfixes:

    - detect changes in inputData array (#10)
    - fixed detecting changes in mfRowsOnPage (#32)
    - fixed support for AOT compilation

## 0.5.1 (2016-10-25)

Changes:
    
    - changed the old "typings" system to the new "@types" system
    - added support for AOT compilation
    
Bugfixes:

    - sorting by child properties (#41)

## 0.5.0 (2016-10-09)

Breaking changes:

    - update angular library to 2.0.0
    
Bugfixes:

    - sort case insensitive
    - fixed pagination, fix #29, #33
    
#Changelog

## 0.4.2 (2016-05-11)

Breaking changes:

    - update angular library to 2.0.0-rc.0

## 0.3.0 (2016-05-08)

Breaking changes:

    - move `rowsOnPage` and `activePage` input from BootstrapPaginator to DataTable directive

Bugfixes:

    - fix error when mfData input is undefined
    - add src so map files should have correct paths

## 0.2.5 (2016-04-19)

Bugfixes:

    - fix not visible paginator

## 0.2.4 (2016-04-19)

Bugfixes:

    - add import for lodash in file `DataTable.ts`

## 0.2.3 (2016-03-21)

Bugfixes:

    - remove `href` attribute from DefaultSorter
    - add style `cursor: pointer` to links in DefaultSorter and BootstrapPaginator
    
## 0.2.2 (2016-03-21)

Bugfixes:

    - remove `href` attribute from BootstrapPaginator template
    
