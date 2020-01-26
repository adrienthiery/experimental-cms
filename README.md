# experimental-cms

Idea of a CMS that both developers and maintainers could work on at the same time.

It needs to give enough flexibility to maintainers so they can modify all content, choose layout, etc. but give the freedom to the devs to code all UI elements (Design System based).

## What if

### Pages 

Pages could contain a set of fields that we can re-order.

Pages could have a "static" checkbox, which would make it compile to plain old HTML (ex: Gatsby).

The CMS comes with a few extra predefined "components" which are related to Models:

* Collection / List (display a list of all instances of a Model, with pagination or not)
* "Smart" Link : references another page

### Layout

A layout would be like a page, but you could define special fields, which can be overriden by a page using that layout.

### Models

A set of fields with different types.

Types could include:

* String
* Number
* Media
* One of Enum
* Date
* Date created
* Date updated
* Creator
* Last modified by
* Reference to another Model?

Models would have an "API Enabled" checkbox, that would create a restful API and/or make it available to a GraphQL endpoint.

### User journeys

A journey can represent a funnel for a User, for example it could be defined by linking several Pages to each other, with conditional links.

This idea would be to integrate, for example, a Checkout flow for a User.

### Custom API

Creating a custom API running business logic and interacting with models data should be very simple.

## Managing Permissions

Getting inspiration from [Directus](https://directus.io).

You can create Roles and Users.

For each role, you can define Rights on each Model or Page, Rights being one of:

* Read
* Read/Write
* Delete
* None (= hidden)

The only Role by default would be:

* Admin (All rights on everything)

## Persistence

Instead of using a DB (or, in addition to using a DB), the CMS can write data files in a format that's customizable (JSON, YAML, etc.) to store all models data.

The advantage would then be that you can modify the data (ex: Adding models) from the UI as well as from the code (for developers).

## Design System

Each "type of field" that you can use in a Page/Layout would be, for example, a React component.

By "understanding" the components, the CMS would make the UI reflect what's possible (can it take children? What's customizable, etc.)

The Design System (set of components making the UI), could be in several languages, not only React.

## Extensivity

Plugins would give you extra components (Carousels, etc.)

It would be fun that any React component could be added as a plugin.

## Leveraging the power of current web standards

We always say that CSS is super powerful, but it is super hard to do correctly.

Could this CMS make it so the structure of CSS files is just right (i.e. small CSS files, namespaced by components, are loaded only when the page is using that component, etc.)

Same for JS if ever it is needed (interactivity): Load the JS only when needed.

If computation needs to take place, (ex: to display graphs), this could be offset to web workers by default or in WebAssembly (might be getting too far).

## SEO

The CMS would provide guidelines for the best SEO possible right in the admin pannel, and that out of the box, with smart defaults generating meta tags, etc. based on the content of the page.

Better, still, it could run lighthouse tests on static pages out of the box.

## Publishing

Publishing needs to be really fast.

Needing to wait 10 mins for your site to be updated is a pain in the butt.

This could be achieved through re-building the HTML generated page on submit, i.e. the Admin part of the CMS is writing the files.

## Saving the result

Through a github app, "saving" the site would push to your repository.

## Architecture 

 * Admin part : 
    * NodeJS API server that can write the "Site" files
    * "data/" folder with: Models definition, "Database" JSON files
    * Single Page App that gives a default clean UI
 * Site : HTML, CSS, JS (as less as possible), folder with assets (Media, fonts, etc.)

Files/UI mirroring: A neat thing would be to have a process watching all the "data" files, and update the Admin SPA, if ever some files are changed, that through socket.

## Internationalization

The CMS should provide internationalization out of the box

## File Structure

The admin project could contain the "public" project as a submodule?

That way you can "plug" any repository in there.

