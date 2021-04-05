import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  showId = false;

  constructor(
    public postsService: PostsService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.showId = !!params.showId;
    });

    this.route.fragment.subscribe((fragment) => {
      console.log(fragment);
    });
  }

  showIdsPrg() {
    this.router.navigate(['/posts'], {
      queryParams: {
        showId: true
      },
      fragment: 'test-frg2'
    });
  }
}
