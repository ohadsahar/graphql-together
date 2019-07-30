import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from 'src/environments/environment';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularMaterialModules } from './modules/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostsComponent } from './core/components/post/posts.component';
import { NewsComponent } from './core/components/news/news.component';
import { HitsComponent } from './core/components/hits/hits.component';
import { MenuComponent } from './core/components/menu/menu.component';


@NgModule({
  declarations: [AppComponent, PostsComponent, NewsComponent, HitsComponent, MenuComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    AngularMaterialModules,
    BrowserAnimationsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {


    apollo.create({
      link: httpLink.create({ uri: environment.gql_node_host }),
      cache: new InMemoryCache()
    });

  }
}
