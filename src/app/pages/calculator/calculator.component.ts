import { Component, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {

  calculationString: string = "";
  answer: string = "";
  
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  calculate()
  {
    this.answer = this.evil(this.calculationString);
  }

  clear()
  {
    this.calculationString = "";
    this.answer = "";
  }

  buildCalculateString(data:any)
  {
    if(this.calculationString.length == 0)
    {
      if(data == "+" || data == "*" || data == "/")
      {
        return;
      }
    }
    var lastChar = this.calculationString[this.calculationString.length - 1];
    if(data == "+" || data == "*" || data == "/" || data == "-")
    {
      if(lastChar == "+" || lastChar == "*" || lastChar == "/" || lastChar == "-")
      {
        this.calculationString = this.calculationString.slice(0, -1) + data;
        return;      
      }
    }

    if(data == ".")
    {
      const regex = /\.+(\d*)$/;
      if (lastChar == '.')
      {
        return;
      }
      else
      if(regex.test(this.calculationString))
      {
        return; 
      }
      else
      if(!/\d/.test(lastChar))
      {
        this.calculationString += "0.";
        return;
      }
    }

    this.calculationString += data;
  }

  evil(fn:any) {
    return new Function('return ' + fn)();
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (/\d/.test(event.key) || event.key == "+" || event.key == "-" || event.key == "/" || event.key == "*" || event.key == ".") 
    {
      this.buildCalculateString(event.key);
    }
    if (event.key === 'Enter') 
    {
      this.calculate();
    }
    if (event.key === 'Escape') 
    {
      this.clear();
    }
  }

}
