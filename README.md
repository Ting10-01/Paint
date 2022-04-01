# Software Studio 2020 Spring
## Assignment 01 Web Canvas


### Scoring

| **Basic components**                             | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Basic control tools                              | 30%       | Y         |
| Text input                                       | 10%       | Y         |
| Cursor icon                                      | 10%       | Y         |
| Refresh button                                   | 10%       | Y         |

| **Advanced tools**                               | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Different brush shapes                           | 15%       | Y         |
| Un/Re-do button                                  | 10%       | Y         |
| Image tool                                       | 5%        | Y         |
| Download                                         | 5%        | Y         |

| **Other useful widgets**                         | **Score** | **Check** |
| :----------------------------------------------- | :-------: | :-------: |
| Name of widgets                                  | 1~5%     | Y         |


---

### How to use 

![](https://i.imgur.com/Mz0FpQ8.png) 按下這個button拖曳即可在canvas上畫畫

![](https://i.imgur.com/4B23Zzr.png)這個button可以把任何畫布上的痕跡、圖片擦掉

![](https://i.imgur.com/OjPpCH0.png)在畫布上點擊即可在那個位置打字，backspace可以刪除前一個文字，但要按下entet鍵文字才會真正被寫在canvas上

![](https://i.imgur.com/SgJDrjM.png)畫圓工具，在畫布上點擊拖曳即可，圓心會在滑鼠一開始點擊的位置上

![](https://i.imgur.com/PNTEAuu.png)點擊即可畫長方形，一開始點擊的位置會是其中一個角的位置，可以往任意方向拖曳

![](https://i.imgur.com/80dw94D.png)這個button畫出來的三角形是等腰三角形，也可以往任意位置拖曳

![](https://i.imgur.com/nWHiL6T.png)還原上一個動作，如果已經還原到最一開始就不會有任何動作

![](https://i.imgur.com/ihRhPxp.png)還原之後可以再把剛剛還原的動作復原回來，復原到最新的時候不會再做任何改變

![](https://i.imgur.com/5KzcMqU.png)重製畫布，把所有畫布上的東西都清空，也無法undo, redo，回到最一開始的狀態

![](https://i.imgur.com/g7n2uRi.png)點擊即可選擇上傳的圖片，圖片會出現在畫布的左上角

![](https://i.imgur.com/3kOVmg3.png)點擊即可下載當下畫布的樣子

![](https://i.imgur.com/J3MdoLO.png)畫框功能，如果完成畫作可以選擇加上畫框，但是加上畫框後就無法再更改畫布除非reset


![](https://i.imgur.com/WOU7FB7.jpg)
1. 調整筆刷大小，適用於brush, eraser跟畫圖形的部分
2. 選擇顏色，適用範圍跟筆刷大小相同
3. 在打字的時候可以選擇字體
4. 選擇字體的大小，只適用於打字的時候
5. 相框種類，有三種選擇



### Function description

如果想要添加相框，就在上面的選單裡選擇要使用的相框，在按下況框的圖示。按下圖示後會跳出一個alert詢問是否要添加要添加相框。
![](https://i.imgur.com/8mz2RnQ.jpg)
如果這邊選擇確定的話，相框就會被添加上去，且不能再對畫布做任何更動。但如果選擇取消，相框就不會被添加並且可以繼續使用其他功能。如果相框被加上去了，只能用reset的方式將畫布清除。


### Gitlab page link

https://107062113.gitlab.io/AS_01_WebCanvas/



### Others (Optional)

QAQ畫框之所以加上去就不能改是因為google好像會把我的圖片擋掉，不讓我把加了相框的畫布push進去array存起來。

    Uncaught SecurityError: 
    Failed to execute 'toDataURL' on 'HTMLCanvasElement': 
    Tainted canvases may not be exported.
所以添加相框之後所有的動作都沒辦法undo，因為array沒辦法再push新的東西就沒辦法還原上一個動作QQ



<style>
table th{
    width: 100%;
}
</style>