---
layout: post
title: "Fix Failed Background Migrations after Upgrading GitLab to v15.11.x"
---

After upgrading from GitLab 15.5.9 to 15.11.2 there were two failed background migrations, `CopyColumnUsingBackgroundMigrationJob: ci_build_needs` and `CopyColumnUsingBackgroundMigrationJob: sent_notifications`.

This can be fixed by following those steps:
1. Edit `/opt/gitlab/embedded/service/gitlab-rails/db/migrate/20230130175512_initialize_conversion_of_sent_notifications_to_bigint.rb` and comment out the `def down` block.
2. Run `gitlab-rake db:migrate:redo VERSION=20230130175512`.
3. Undo step 1.
4. Restart the background migration `CopyColumnUsingBackgroundMigrationJob: sent_notifications` in GitLab.
5. Repeat all steps for `/opt/gitlab/embedded/service/gitlab-rails/db/migrate/20230130104819_initialize_conversion_of_ci_build_needs_to_bigint.rb` (replace the `VERSION` timestamp in step 2!)

---
1. <https://forum.gitlab.com/t/failing-background-migrations/85350/7>
