BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_profileImageUrl_df] DEFAULT 'https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_640.png' FOR [profileImageUrl];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
