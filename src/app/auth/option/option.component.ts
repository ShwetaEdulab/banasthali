import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  utm_source;
  constructor(private router : Router,
    private route: ActivatedRoute) { 
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
    }

  ngOnInit() {
  }

  onNormal(){
    this.router.navigate(['/auth/register'],{queryParams:{utm_source:this.utm_source}});
  }

  onDTE(){
    this.router.navigate(['/auth/DTERegister'],{queryParams:{utm_source:this.utm_source}});

  }
}
