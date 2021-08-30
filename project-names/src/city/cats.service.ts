import { Injectable } from '@nestjs/common';
import { window } from 'rxjs';
import { Cat } from './interfaces/cat';
import { catData } from './interfaces/catdata';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  start(name: string): string {
    let arr = [],
      num = 0,
      isEnd = 1;
    if (this.cats.length) {
      arr = this.cats.filter((item) => {
        return item.name == name && item.isOut == false;
      });
    } else {
      catData.map((item) => {
        let index = 0;
        for (; index < item.maxCode; index++) {
          const json: Cat = {
            id: item.name + index,
            name: item.name,
            code: index + 1,
            maxCode: item.maxCode,
            number: 0,
            maxNumber: item.maxNumber,
            isOut: false,
          };
          this.cats.push(json);
          arr = this.cats;
        }
      });
    }
    if (arr.length) {
      num = Math.round(Math.random() * (arr.length - 1));
      this.cats.map((item) => {
        // if (item.id == arr[num].id) {
        //   if (item.number + 1 >= item.maxNumber) {
        //     item.isOut = true;
        //   } else {
        //     item.number++;
        //   }
        // }
        if (item.isOut == false) {
          isEnd = 0;
        }
      });
    }
    console.log('start>>', this.cats);
    return isEnd ? '没有code了！' : `code : ${arr[num].code}`;
  }

  end(name: string, code: string): string {
    let isEnd = 1,
      num = 0;
    if (code) {
      this.cats.map((item) => {
        if (item.name == name && item.code == Number(code)) {
          if (item.number + 1 == item.maxNumber) {
            item.number += 1;
            num = item.number;
            isEnd = 0;
          } else if (item.number + 1 < item.maxNumber) {
            item.number += 1;
            num = item.number;
            isEnd = 0;
          } else {
            item.isOut = true;
          }
        }
      });
    }
    console.log('end>>', this.cats);
    return isEnd ? '提交已满，提交失败。' : `提交成功,提交了${num}次`;
  }
}
