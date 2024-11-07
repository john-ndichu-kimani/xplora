BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] DROP CONSTRAINT [User_profileImageUrl_df];
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_profileImageUrl_df] DEFAULT 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?t=st=1719249110~exp=1719252710~hmac=ef12cebeb3a2b9041c3c229d156698f553a94599eca3c852dceb82ae46e1bb17&w=740' FOR [profileImageUrl];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
