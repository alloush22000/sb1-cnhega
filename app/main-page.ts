import { EventData, Page } from '@nativescript/core';
import { ConnectionViewModel } from './shared/view-models/connection.view-model';

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    page.bindingContext = new ConnectionViewModel();
}