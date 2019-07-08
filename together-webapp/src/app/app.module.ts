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
import { FormsModule } from '@angular/forms';
import { PostsComponent } from './core/components/post/posts.component';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { NewsComponent } from './core/components/news/news.component';
import { HitsComponent } from './core/components/hits/hits.component';

@NgModule({
  declarations: [AppComponent, PostsComponent, NewsComponent, HitsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    AngularMaterialModules,
    BrowserAnimationsModule,
    FormsModule,
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

    // const http = httpLink.create({ uri: environment.gql_node_host});
    // const GRAPHQL_ENDPOINT = 'ws://localhost:3000/graphql';
    // const client = new SubscriptionClient(GRAPHQL_ENDPOINT, {reconnect: true});
    // const clientLink = new WebSocketLink(client);
    // const link = split(
    //   ({ query }) => {
    //     const { kind, operation } = getMainDefinition(query);
    //     return kind === 'OperationDefinition' && operation === 'subscription';
    //   },
    //   clientLink,
    //   http
    // );

    // apollo.create({
    //   http,
    //   cache: new InMemoryCache()
    // });

  }
}
