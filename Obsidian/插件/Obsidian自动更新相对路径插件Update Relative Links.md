Obsidian 自带的设置 ” 始终更新内部链接 “（Automatically update internal links） 选项实现的有问题。文件移动后，只会自动更新指向这个文件的链接，不会更新这个文件内指向其他文件的链接

而Update Relative Links插件就是用来解决这个问题的。另外还提供了一个批量修正所有已经存在的链接的命令

插件包含两个功能：

1. 文件移动后，自动修复链接的相对路径。安装并启用插件后，移动文件会自动触发，无需其他操作

2. 批量将所有文件中的链接修复为相对路径。打开命令面板（默认快捷键是 Ctrl + P），搜索 “ Update all relative links ”，回车执行

与[Consistent Attachments and Links](Obsidian附件管理插件Consistent%20Attachments%20and%20Links.md)插件相比，此插件有着一个无法替代的优势：

在Obsidian中将附件的引用链接复制到另一个文件夹的笔记中，在Obsidian不会更新该链接（在Obsidian中可见该附件，但Typora中不可见）（使用Typora复制链接，会把附件同步复制过去）

而使用Update Relative Links，虽然不能自动更新链接，但却能通过命令面板，搜索 “ Update all relative links ”  批量更新相对路径