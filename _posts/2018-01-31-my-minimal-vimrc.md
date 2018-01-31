---
layout: post
title: My Minimal .vimrc"
tags: [vim]
---

When I started using Linux actively 5 years ago, I discovered the [/r/unixporn](https://reddit.com/r/unixporn) subreddit and got lots of inspiration from the lovely crafted terminal setups posted there.

I challenged myself to get comfortable with *vim* and despite the usual initial difficulties, I learned to love the editor. As presumably every *vim* novice, I started to get my hands on the mystical *.vimrc* file.

Obviously, in the beginning I just copied and pasted blocks of *.vimrc* configs from other dotfile repos and tutorials, without understanding what the lines I pasted mean. Of course I used all kind of seemingly "cool" and useful plugins, added a plugin-manager (*Pathogen*, *Vundler*, ...) and got fancy with the *Powerline* plugin.

My *.vimrc* fastly grow to a big, bulky mess of mindless configuration blocks. Thanks to blog posts like [Doug Black's *'A Good Vimrc'*](https://web.archive.org/web/20180106045128/https://dougblack.io/words/a-good-vimrc.html), I started trying to understand what the *.vimrc* configuration options do.

I liked Doug Black's approach of "*Don't put any lines in your vimrc that you don't understand.*" and later came to the conclusion that I don't need most of the stuff in my *.vimrc*. So I started from scratch, read a lot about *vim*'s configuration possibilities and tried to only use an option if I fully understand it's purpose.

By doing that and working with *vim* on a daily basis, I also learned that I don't need any plugins at all. I know that this might seem very drastic for most people (no autocomplete plugin!), but as a Linux Sysadmin it totally fulfills all my needs.

I set myself a goal to reduce my *.vimrc* to a maximum of **50 SLOC**! That means that my *vim* configuration most likely doesn't fit anybody else's needs, but it works great for me and I understand every single line in it.

Enough of the introduction, here it is:


### Basic Settings
This first lines cover the very basic of *vim*'s behaviour, most of it self-explanatory:

```
set autoread                                     " reload on external file changes
set backspace=indent,eol,start                   " backspace behaviour
set clipboard=unnamed,unnamedplus                " enable clipboard
set encoding=utf8                                " enable utf8 support
set hidden                                       " hide buffers, don't close
set mouse=a                                      " enable mouse support
set nowrap                                       " disable wrapping
set number                                       " show line numbers
set term=xterm-256color                          " terminal type
set wildmenu wildmode=longest:full,full          " wildmode settings
```


### UI Settings
Some UI settings, like whitespace characters, syntax highlighting and a little hack (*scrollback*), which always keeps the current line vertically centered on the screen:

```
filetype plugin indent on                        " enable filetype detection
set listchars=eol:¶,trail:•,tab:▸\               " whitespace characters
set scrolloff=999                                " center cursor position vertically
set showbreak=¬\                                 " Wrapping character
set showmatch                                    " show matching brackets
syntax on                                        " enable syntax highlightning
```


### Colors
I really liked *Atom*'s default colorscheme **Onedark**, so I ditched *Solarized Dark* for this one at some point. [Josh Dick recreated it for *vim*](https://github.com/joshdick/onedark.vim).

```
colorscheme onedark                              " set colorscheme
hi Normal guibg=NONE ctermbg=NONE|               " transparency fix
let g:onedark_termcolors=256                     " enable 256 colors support
```


### Statusline
This is propably the most minimalistic (and weirdest) part of my *.vimrc*. I don't use the statusline at all, just the ruler. Besides of it's minimalistic nature, I really like to have only one fixed line on the bottom for everything, I have no need for more fancy information except the cursor position, the current filesize and the modified status:

```
set laststatus=0                                 " disable statusline
set ruler rulerformat=%40(%=%<%F%m\ \
                      \›\ %{getfsize(@%)}B\ \
                      \›\ %l/%L:%v%)
```


### Tabs & Indentation
[*Spaces* over *Tabs*! (and *vim* over *emacs*!)](https://www.youtube.com/watch?v=SsoOG6ZeyUI), it's the law! Or for me: *2 spaces equal 1 tabstop*:

```
set autoindent expandtab                         " autoindentation & tabbing
set shiftwidth=2 softtabstop=2 tabstop=2         " 1 tab = 2 spaces
```


### Search Settings
Plain and simple: highlight search results, ignore case, icremental search, use case if at least one character is upper-case and the other isn't:

```
set hlsearch ignorecase incsearch smartcase      " search options
```


### Undo & Backup
Very useful feature, which isn't configured properly in default *vim* configs. This one uses *undo* files to make the undo-history persistent on disk. Also it disables the annoying *.swp* files, which tend to pollute directories and git repos (if *.gitignore* is not configured properly):

```
set nobackup noswapfile nowritebackup            " disable backup/swap files
set undofile undodir=~/.vim/undo undolevels=9999 " undo options
```


### Performace Tuning
I don't remember the blog post where this was discussed, but it's a real performance booster:

```
set lazyredraw                                   " enable lazyredraw
set nocursorline                                 " disable cursorline
set ttyfast                                      " enable fast terminal connection
```


### Key Mappings
A very useful *vim* feature, which I only learned to use recently, is the *leader* key. This feature alone gave my *vim* experience a powerful boost:

```
let mapleader=','                                " leader key
```

I only use a dozen custom *leader key* commands, because who can remember more than that?

```
nnoremap <leader>, :let @/=''<CR>:noh<CR>|       " clear search
nnoremap <leader># :g/\v^(#\|$)/d_<CR>|          " delete commented/blank lines
nnoremap <leader>b :ls<CR>:buffer<space>|        " show/select buffer
nnoremap <leader>d :w !diff % -<CR>|             " show diff
nnoremap <silent> <leader>i gg=G``<CR>|          " fix indentation
nnoremap <leader>l :set list! list?<CR>|         " toggle list (special chars)
nnoremap <leader>n :set invnumber number?<CR>|   " toggle line numbers
nnoremap <leader>p :set invpaste paste?<CR>|     " toggle paste mode
nnoremap <leader>r :retab<CR>|                   " convert tabs to spaces
nnoremap <leader>s :source $MYVIMRC<CR>|         " reload .vimrc
nnoremap <silent> <leader>t :%s/\s\+$//e<CR>|    " trim whitespace
nnoremap <leader>w :set wrap! wrap?<CR>|         " toggle wrapping
```

One last command can save lives if you forgot to run *vim* as root before editing a file: `:w!!` calls `sudo` to write the buffer to the file:

```
cnoreabbrev w!! w !sudo tee > /dev/null %|       " write file with sudo
```


And that's all the *vim* configuration I need!

Of course my dotfiles can be found in a [Github Repo](https://github.com/j7k6/dotfiles).



---
