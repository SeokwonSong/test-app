import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  // instantiate posts to an empty object
  posts: any = [];
  totalItems = 64;
  public currentPage = 4;
  smallnumPages = 0;

  constructor(private postsService: PostsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // Retrieve posts from the API
    
    this.postsService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      console.log(this.posts)
    });

    this.currentPage = parseInt(this.activatedRoute.snapshot.queryParams['p']);
    console.log(this.currentPage);


  }

  ngAfterViewInit(): void {
    


  }



  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }
}
